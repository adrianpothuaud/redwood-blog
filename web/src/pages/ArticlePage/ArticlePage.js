import { MetaTags } from '@redwoodjs/web'

import ArticleCell from 'src/components/ArticleCell'

const ArticlePage = ({ articleId }) => {
  return (
    <>
      <MetaTags title="Article" description="Article page" />

      <ArticleCell articleId={articleId} />
    </>
  )
}

export default ArticlePage
