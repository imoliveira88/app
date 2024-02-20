import React from 'react'
import { Image, ImageSourcePropType, TextProps, ActivityIndicator, TouchableOpacity } from 'react-native'
import { RectButtonProperties } from 'react-native-gesture-handler'

import { Container, ButtonText, StyledIcon } from './styles'

interface ButtonProps extends RectButtonProperties {
  children: string | TextProps
  icon?: string | null
  image?: ImageSourcePropType | null
  isLoading?: boolean | false
  disabled?: string | null
  onPress: any
}
const Button: React.FC<ButtonProps> = ({ children, icon, image, isLoading, onPress, ...rest }) => (
  <TouchableOpacity disabled={isLoading ? true : false} onPress={!isLoading && onPress} >
    <Container {...rest}>
      {icon && <StyledIcon name={icon} />}
      {image && <Image source={image} resizeMode='stretch' style={{ width: 80, height: 80 }} />}
      <ButtonText icon={icon}>{isLoading ? (
        <ActivityIndicator color="white" />
      ) : children}</ButtonText>
    </Container>
  </TouchableOpacity>
)

export default Button
