

export const Loading = () => {
  return(
    <div className = "flex-1 flex items-center justify-center">
      <p className = "text-muted-foreground">Loading Users</p>
    </div>
  )
}

interface ErrorProps {
  err: string
}

export const Error = ({ err }: ErrorProps) => {
  return(
    <div className = "flex-1 flex items-center justify-center">
      <p className = "text-destructive">{ err }</p>
    </div>
  )
}