type SvgrComponent = React.FC<
  React.SVGProps<SVGSVGElement> & {
    title?: string
  }
>

declare module '*.svg' {
  const value: SvgrComponent
  export default value
}

type Prefer<MainType extends ObjectType, SecondaryType extends ObjectType> = MainType &
  Omit<SecondaryType, keyof MainType>
