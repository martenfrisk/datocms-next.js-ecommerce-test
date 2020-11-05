import markdownStyles from '../markdown-styles.module.css'

export default function ProductBody({ content }: { content: any }) {
  return (
    <div
      className={markdownStyles.markdown}
    >
      {content}
    </div>
  )
}
