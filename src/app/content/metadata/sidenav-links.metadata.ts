import { SidenavLink } from "./../models/sidenav-link.model";

// A Collection of links per user role

export const defaultLinks: SidenavLink[] = [
  { title: "404 NOT FOUND", isHeader: true }
];

export const superAdminLinks: SidenavLink[] = [
  { title: "Master Data", isHeader: true },
  { title: "Projects", link: "projects", icon: "table", isHeader: false },
  { title: "Positions", link: "positions", icon: "table", isHeader: false },
  {
    title: "Employment Status",
    link: "employment/status",
    icon: "table",
    isHeader: false
  },
  {
    title: "Employee Status",
    link: "employee/status",
    icon: "table",
    isHeader: false
  },
  { title: "Human Resources", isHeader: true },
  {
    title: "Register Employee",
    link: "employee/register",
    icon: "book",
    isHeader: false
  },
  {
    title: "Employee List",
    link: "employee/list",
    icon: "people",
    isHeader: false
  }
];

export const projectHrLinks: SidenavLink[] = [
  { title: "Master Data", isHeader: true },
  { title: "Positions", link: "positions", icon: "table", isHeader: false },
  {
    title: "Employment Status",
    link: "employment/status",
    icon: "table",
    isHeader: false
  },
  {
    title: "Employee Status",
    link: "employee/status",
    icon: "table",
    isHeader: false
  },
  { title: "Human Resources", isHeader: true },
  {
    title: "Register Employee",
    link: "employee/register",
    icon: "book",
    isHeader: false
  },
  {
    title: "Employee List",
    link: "employee/list",
    icon: "people",
    isHeader: false
  }
];
