import { PageLoaderService } from "./page-loader.service";
import { LoginGuard } from "./login.guard";
import { FeaturesGuard } from "./features.guard";

export const services: any[] = [PageLoaderService, LoginGuard, FeaturesGuard];

export * from "./page-loader.service";
export * from "./login.guard";
export * from "./features.guard";
