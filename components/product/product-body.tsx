import markdownStyles from '../markdown-styles.module.css'

export default function ProductBody({ content }: { content: any }) {
  const regex = /(<([^>]+)>)/ig;
  const result = content.replace(regex, '');

  return (
    <div
      className={markdownStyles.markdown}
    >
      {result}
    </div>
  )
}
