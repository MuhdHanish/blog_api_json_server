import express, { NextFunction, Request, Response } from "express";
import chalk from 'chalk';

const PORT = 8000;
const JSON_SERVER_PORT = 3000;
const JSON_SERVER_URL = `http://localhost:${JSON_SERVER_PORT}`;

const app = express();

app.use(express.json());

class CustomError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.name = 'CustomError';
        this.status = status;
    }
};

const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    _next: NextFunction
) => {
    let status = 500;
    let message = 'Internal server error';

    if (err instanceof CustomError) {
        status = err.status;
        message = err.message;
    }

    console.error(
        `${chalk.redBright.bold('[ERROR]')} ${chalk.blueBright(req.method)} ${chalk.cyanBright(req.path)} - ${chalk.yellowBright(`Status: ${status}`)} - ${chalk.whiteBright(message)}\n` +
        `${chalk.greenBright.bold('[Stack Trace]')} ${chalk.gray(err.stack?.split('\n')[1]?.trim() || 'N/A')}`
    );

    return res.status(status).json({
        status: 'error',
        message: message
    });
};

app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.header('Access-Control-Max-Age', '86400');
        res.sendStatus(204);
    } else {
        next();
    }
});

app.get('/', (_req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({
            status: 'success',
            message: 'Server is running'
        });
    } catch (error) {
        next(error);
    }
});

app.get(`/blogs`, async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await fetch(`${JSON_SERVER_URL}/blogs`);
        if (!response.ok) {
            throw new CustomError(`JSON Server responded with status: ${response.status}`, response.status);
        }
        const blogs = await response.json();
        res.status(200).json({ blogs });
    } catch (error) {
        next(error);
    }
});

app.get(`/blogs/:id`, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const response = await fetch(`${JSON_SERVER_URL}/blogs/${id}`);
        if (!response.ok) {
            throw new CustomError('Blog not found', 404);
        }
        const blog = await response.json();
        res.status(200).json({ blog });
    } catch (error) {
        next(error);
    }
});

app.post(`/blogs`, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, content, author } = req.body;
        if (!title || !content || !author) {
            throw new CustomError('All fields are required (title, content, author)', 400);
        }
        const response = await fetch(`${JSON_SERVER_URL}/blogs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                content,
                author,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            })
        });
        if (!response.ok) {
            throw new CustomError(`JSON Server responded with status: ${response.status}`, response.status);
        }
        const blog = await response.json();
        res.status(201).json({ blog });
    } catch (error) {
        next(error);
    }
});

app.put(`/blogs/:id`, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { title, content, author } = req.body;
        const existingBlogResponse = await fetch(`${JSON_SERVER_URL}/blogs/${id}`);
        if (!existingBlogResponse.ok) {
            throw new CustomError('Blog not found', 404);
        }
        const existingBlog = await existingBlogResponse.json();
        const updateData = {
            ...existingBlog,
            ...(title !== undefined && { title }),
            ...(content !== undefined && { content }),
            ...(author !== undefined && { author }),
            updatedAt: new Date().toISOString()
        };
        const response = await fetch(`${JSON_SERVER_URL}/blogs/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData)
        });
        if (!response.ok) {
            throw new CustomError(`JSON Server responded with status: ${response.status}`, response.status);
        }
        const updatedBlog = await response.json();
        res.status(200).json({ blog: updatedBlog });
    } catch (error) {
        next(error);
    }
});

app.delete(`/blogs/:id`, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const response = await fetch(`${JSON_SERVER_URL}/blogs/${id}`, { method: 'DELETE' });
        if (!response.ok) {
            throw new CustomError(`JSON Server responded with status: ${response.status}`, response.status);
        }
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

app.use("*", (_req: Request, _res: Response, next: NextFunction) => {
    next(new CustomError('Resource not found', 404));
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    errorHandler(err, req, res, next);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
