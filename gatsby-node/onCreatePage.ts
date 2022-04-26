import { CreatePageArgs } from 'gatsby';

export default function onCreatePage({ page, actions }: CreatePageArgs) {
  const { createPage, deletePage } = actions;
  const isProduction = process.env.NODE_ENV === 'production';

  deletePage(page);
  createPage({
    ...page,
    context: {
      ...page.context,
      draft: isProduction ? true : null,
    },
  });
}
