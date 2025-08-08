# [Kendo CSS Utilities Cheatsheet](https://kendo-utilities-cheatsheet.vercel.app)

This is a simple Next.js app that serves as a cheatsheet for Kendo CSS utilities. It provides an easy way to browse through various utility classes and their usage.

## The Problem

When working with Kendo UI components, it can be challenging to remember all the available CSS utility classes and their specific use cases. This cheatsheet aims to solve that problem by providing a comprehensive reference guide.

You can view the documentation for Kendo CSS utilities [here](https://www.telerik.com/design-system/docs/utils/get-started/introduction/). Try searching "k-rounded-md" (which is a utility class presented right in the introduction) and you will see no results and a bit of slowness on the page! This is because the Kendo CSS utilities documentation does not provide a searchable index of utility classes, making it difficult to find specific classes quickly.

## The Solution

This project provides a searchable index of Kendo CSS utility classes, allowing developers to quickly find the classes they need without having to navigate through the entire documentation. The cheatsheet is built using Next.js and is designed to be user-friendly and efficient.

Under the hood we use [Fuse.js](https://fusejs.io/) for fuzzy searching, which allows for quick and accurate results even with partial matches.

## Getting Started

First, run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

### [Tailwind CSS](https://tailwindcss.com/)

Ironically, this project does not use Kendo UI's CSS utilities, but instead uses [Tailwind CSS](https://tailwindcss.com/) utility classes for styling. Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs without leaving your HTML.

### [Shadcn](https://ui.shadcn.com/)

Shadcn is a UI component library that provides a set of high-quality, customizable components for building modern web applications. It is built on top of Radix UI and Tailwind CSS, making it a great choice for developers who want to create beautiful, responsive UIs with minimal effort.

### [Next.js](https://nextjs.org/)

Next.js is a React framework that enables developers to build server-rendered React applications with ease. It provides features like static site generation, server-side rendering, and API routes, making it a powerful tool for building modern web applications.

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

This project is deployed on Vercel: https://kendo-utilities-cheatsheet.vercel.app

## Future Improvements

### Tailwind CSS Cheatsheet

There are already many Tailwind CSS cheatsheets available, but they often lack the search functionality that this project provides. In the future, we could consider integrating a Tailwind CSS cheatsheet into this project, allowing users to search for both Kendo and Tailwind utility classes in one place. We can scrape the Tailwind CSS documentation and use the same Fuse.js search functionality to provide a seamless experience for users looking for utility classes across both frameworks. We should also utilize the exact same React components in order to maintain consistency in the user interface.
