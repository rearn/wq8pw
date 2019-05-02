import express from 'express';
import index from '.';
const app = express();

index(app, undefined);

export default app;
