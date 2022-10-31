import { Helmet } from 'react-helmet-async';

type HeadProps = {
  title?: string;
  description?: string;
};

export const Head = ({ title = '', description = '' }: HeadProps = {}) => {
  return (
    <Helmet
      title={title ? `${title} | オープンデータ作成支援ツール` : undefined}
      defaultTitle="オープンデータ作成支援ツール"
    >
      <meta name="description" content={description} />
    </Helmet>
  );
};
