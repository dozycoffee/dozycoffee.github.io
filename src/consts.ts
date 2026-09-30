// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = '도지커피 기술블로그';
export const SITE_DESCRIPTION = '도지커피 팀의 기술 블로그입니다.';

export const CATEGORIES = ['Tech', 'Project'] as const;

/** Site path of a category's article list, e.g. `Tech` -> `/category/tech/`. */
export const categoryPath = (category: (typeof CATEGORIES)[number]) =>
	`/category/${category.toLowerCase()}/`;
