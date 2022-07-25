import React, { ReactElement, memo } from 'react'

interface Props {
  name: string
}

const TicketTitle: React.FC<Props> = (props: Props): ReactElement => {
  return (
    <>
      <h3>{props.name}</h3>
    </>
  )
}

export default memo(TicketTitle)