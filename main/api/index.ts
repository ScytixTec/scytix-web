import express, { Request, Response } from 'express';

const app = express();

app.get('/api/status', (req : Request, res: Response) => {
  
  res.send({
    status: "OK"
  });
});

app.listen(3000, () => {
  console.log(`Server running at http://localhost: 3000`);
});