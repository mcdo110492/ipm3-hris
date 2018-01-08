import { Position } from "@app/features/position/models";

export interface PositionResponse {
  status: number;
  data: Position[];
}
