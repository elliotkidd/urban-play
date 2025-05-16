import { Box } from '@sanity/ui'
import { useMemo } from 'react'
import { HotspotTooltipProps } from 'sanity-plugin-hotspot-array'
import styled from 'styled-components'

interface HotspotFields {
  text: string
}

const StyledBox = styled(Box)`
  width: 200px;
`

export default function ProductPreview(
  props: HotspotTooltipProps<HotspotFields>
) {
  const { value } = props

  const previewProps = useMemo(
    () => ({
      value: value?.text
    }),
    [value?.text]
  )

  return <StyledBox padding={2}>{value && previewProps.value}</StyledBox>
}
