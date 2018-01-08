import { Position } from "./position.model";

export interface DataResponse {
  status: number;
  count: number;
  data: Position[];
}

export interface CreateResponse {
  status: number;
  message: string;
}

export interface UpdateResponse {
  status: number;
  message: string;
  updatedData?: Position;
}
