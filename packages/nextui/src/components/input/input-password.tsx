import React, { useImperativeHandle, useMemo, useRef, useState } from 'react';
import withDefaults from '../../utils/with-defaults';
import { Props, defaultProps } from './input-props';
import PasswordIcon from './password-icon';
import Input from './input';
import { __DEV__ } from '../../utils/assertion';

interface PasswordProps extends Props {
  hideToggle?: boolean;
  visibleIcon?: React.ReactNode;
  hiddenIcon?: React.ReactNode;
}

const passwordDefaultProps = {
  ...defaultProps,
  hideToggle: false,
  visibleIcon: <PasswordIcon visible />,
  hiddenIcon: <PasswordIcon visible={false} />,
};

type NativeAttrs = Omit<React.InputHTMLAttributes<any>, keyof PasswordProps>;
export type InputPasswordProps = PasswordProps &
  typeof passwordDefaultProps &
  NativeAttrs;

const InputPassword = React.forwardRef<
  HTMLInputElement,
  React.PropsWithChildren<InputPasswordProps>
>(
  (
    { hideToggle, visibleIcon, hiddenIcon, children, ...props },
    ref: React.Ref<HTMLInputElement | null>
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [visible, setVisible] = useState<boolean>(false);
    useImperativeHandle(ref, () => inputRef.current);

    const iconClickHandler = () => {
      setVisible((v) => !v);
    };

    const inputProps = useMemo(
      () => ({
        ...props,
        ref: inputRef,
        contentClickable: true,
        onContentClick: iconClickHandler,
        type: visible ? 'text' : 'password',
      }),
      [props, iconClickHandler, visible, inputRef]
    );
    const icon = useMemo(() => {
      if (hideToggle) return null;
      return visible ? visibleIcon : hiddenIcon;
    }, [hideToggle, visible, visibleIcon, hiddenIcon]);

    return (
      <Input contentRight={icon} {...inputProps}>
        {children}
      </Input>
    );
  }
);
if (__DEV__) {
  InputPassword.displayName = 'NextUI - Input Password';
}
InputPassword.defaultProps = defaultProps;

export default withDefaults(InputPassword, passwordDefaultProps);
