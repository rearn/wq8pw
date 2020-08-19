// eslint-disable-next-line import/no-extraneous-dependencies
import express from 'express';
import index from '.';

const app = express();

index(app);

export default app;
