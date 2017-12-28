import { PageLoaderService } from "./page-loader.service";
import { LoginGuard } from "./login.guard";
import { ToastrService } from "./toastr.service";
import { ProtectedRoutesGuard } from "./protected-routes.guard";
import { TokenVerifierService } from "./token-verifier.service";
import { LoaderService } from "./loader";

export const services: any[] = [
  PageLoaderService,
  LoginGuard,
  ToastrService,
  ProtectedRoutesGuard,
  TokenVerifierService,
  LoaderService
];

export * from "./page-loader.service";
export * from "./login.guard";
export * from "./toastr.service";
export * from "./protected-routes.guard";
export * from "./token-verifier.service";
export * from "./request-token-interceptor.service";
export * from "./loader";
