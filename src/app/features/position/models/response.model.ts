import { Position } from "./position.model";

export interface DataResponse {
  status: number;
  count: number;
  data: Position[];
}

export interface StatusResponse {
  status: number;
  message: string;
  createdData?: Position;
}
