type RouteScaffoldProps = {
  title: string
}

export function RouteScaffold({ title }: RouteScaffoldProps) {
  return (
    <main id="main-content" className="route-scaffold">
      <h1 className="sr-only">{title}</h1>
    </main>
  )
}
