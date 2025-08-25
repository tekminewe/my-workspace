import { NextRequest, NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const getLocale = (request: Request, locales: string[]) => {
  const negotiatorHeaders = Object.fromEntries(request.headers.entries());
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  return match(languages, locales, locales[0]);
};

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const { pathname } = request.nextUrl;
  const host = request.headers.get("host");
  if (pathname.includes("sitemap") || pathname.includes("robots")) {
    return NextResponse.next({
      request,
    });
  }

  // Extract domain without subdomain and port
  const domain = host?.split(":")[0].split(".").slice(-2).join(".");
  if (!domain) {
    return NextResponse.redirect(new URL("/404", request.url));
  }

  const locales = process.env.ALLOWED_LOCALES?.split(",") ?? [];
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (pathnameHasLocale) {
    request.headers.set("x-locale", pathname.split("/")[1]);
    return NextResponse.next({
      request,
    });
  }

  const locale = getLocale(request, locales);
  request.headers.set("x-locale", pathname.split("/")[1]);
  request.nextUrl.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(request.nextUrl);

  // const tenantId = domainMap[domain];
  // if (!tenantId) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }
  // const [_, ...rest] = url.pathname.split("/");
  // console.log(
  //   "url :",
  //   url.pathname,
  //   " rewrite to: ",
  //   `/en/${tenantId}/${rest.join("/")}`
  // );
  // return NextResponse.rewrite(
  //   new URL(`/en/${tenantId}/${rest.join("/")}`, request.url)
  // );
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - assets (assets folder)
     */
    "/((?!api|assets|_next/static|_next/image|favicon.ico).*)",
  ],
};
