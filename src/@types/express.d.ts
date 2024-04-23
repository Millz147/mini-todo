import 'express'
declare global {
  namespace Express {
    interface Request {}
    interface Response {}
  }
  type ApiResponse = {
    success: boolean;
    message: string;
    status: number;
    data: any;
  };
}
