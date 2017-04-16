/**
 * This code was written by @gcanti
 * and was taken from https://github.com/facebook/flow/issues/2536#issuecomment-250067596
 */

declare module 'react-css-modules' {
  declare type CssOptions = {
    allowMultiple?: boolean,
    errorWhenNotFound?: boolean,
  };

  declare type FunctionComponent<P> = (props: P) => ?React$Element<any>;
  declare type ClassComponent<D, P, S> = Class<React$Component<D, P, S>>;

  declare function exports<D, P, S, C: ClassComponent<D, P, S> | FunctionComponent<P>>(reactClass: C, styles: Object, cssOptions?: CssOptions): C;
}
