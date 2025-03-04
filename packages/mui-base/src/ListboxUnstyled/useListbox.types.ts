import * as React from 'react';

type UseListboxStrictPropsRequiredKeys =
  | 'isOptionDisabled'
  | 'disableListWrap'
  | 'disabledItemsFocusable'
  | 'optionComparer'
  | 'multiple';

export type UseListboxStrictProps<TOption> = Omit<
  UseListboxParameters<TOption>,
  UseListboxStrictPropsRequiredKeys
> &
  Required<Pick<UseListboxParameters<TOption>, UseListboxStrictPropsRequiredKeys>>;

export type FocusManagementType = 'DOM' | 'activeDescendant';

enum ActionTypes {
  blur = 'blur',
  focus = 'focus',
  keyDown = 'keyDown',
  optionClick = 'optionClick',
  optionHover = 'optionHover',
  optionsChange = 'optionsChange',
  setValue = 'setValue',
  setHighlight = 'setHighlight',
}

// split declaration and export due to https://github.com/codesandbox/codesandbox-client/issues/6435
export { ActionTypes };

interface OptionClickAction<TOption> {
  type: ActionTypes.optionClick;
  option: TOption;
  event: React.MouseEvent;
  props: UseListboxStrictProps<TOption>;
}

interface OptionHoverAction<TOption> {
  type: ActionTypes.optionHover;
  option: TOption;
  event: React.MouseEvent;
  props: UseListboxStrictProps<TOption>;
}

interface FocusAction<TOption> {
  type: ActionTypes.focus;
  event: React.FocusEvent;
  props: UseListboxStrictProps<TOption>;
}

interface BlurAction<TOption> {
  type: ActionTypes.blur;
  event: React.FocusEvent;
  props: UseListboxStrictProps<TOption>;
}

interface KeyDownAction<TOption> {
  type: ActionTypes.keyDown;
  event: React.KeyboardEvent;
  props: UseListboxStrictProps<TOption>;
}

interface SetValueAction<TOption> {
  type: ActionTypes.setValue;
  value: TOption | TOption[] | null;
}

interface SetHighlightAction<TOption> {
  type: ActionTypes.setHighlight;
  highlight: TOption | null;
}

interface OptionsChangeAction<TOption> {
  type: ActionTypes.optionsChange;
  options: TOption[];
  previousOptions: TOption[];
  props: UseListboxStrictProps<TOption>;
}

export type ListboxAction<TOption> =
  | OptionClickAction<TOption>
  | OptionHoverAction<TOption>
  | FocusAction<TOption>
  | BlurAction<TOption>
  | KeyDownAction<TOption>
  | SetHighlightAction<TOption>
  | SetValueAction<TOption>
  | OptionsChangeAction<TOption>;

export interface ListboxState<TOption> {
  highlightedValue: TOption | null;
  selectedValue: TOption | TOption[] | null;
}

export type ListboxReducer<TOption> = (
  state: ListboxState<TOption>,
  action: ListboxAction<TOption>,
) => ListboxState<TOption>;

interface UseListboxCommonProps<TOption> {
  /**
   * If `true`, it will be possible to highlight disabled options.
   * @default false
   */
  disabledItemsFocusable?: boolean;
  /**
   * If `true`, the highlight will not wrap around the list if arrow keys are used.
   * @default false
   */
  disableListWrap?: boolean;
  focusManagement?: FocusManagementType;
  /**
   * Id attribute of the listbox.
   */
  id?: string;
  /**
   * A function that determines if a particular option is disabled.
   * @default () => false
   */
  isOptionDisabled?: (option: TOption, index: number) => boolean;
  /**
   * Ref of the listbox DOM element.
   */
  listboxRef?: React.Ref<any>;
  /**
   * Callback fired when the highlighted option changes.
   */
  onHighlightChange?: (option: TOption | null) => void;
  /**
   * A function that tests equality between two options.
   * @default (a, b) => a === b
   */
  optionComparer?: (optionA: TOption, optionB: TOption) => boolean;
  /**
   * A function that generates the id attribute of individual options.
   */
  optionIdGenerator?: (option: TOption, index: number) => string;
  /**
   * Array of options to be rendered in the list.
   */
  options: TOption[];
  /**
   * Custom state reducer function. It calculates the new state (highlighted and selected options)
   * based on the previous one and the performed action.
   */
  stateReducer?: ListboxReducer<TOption>;
}

interface UseSingleSelectListboxParameters<TOption> extends UseListboxCommonProps<TOption> {
  /**
   * The default selected value. Use when the component is not controlled.
   */
  defaultValue?: TOption | null;
  /**
   * If `true`, the component will allow to select multiple options.
   * @default false
   */
  multiple?: false;
  /**
   * The selected value. Use when the component is controlled.
   */
  value?: TOption | null;
  /**
   * Callback fired when the value changes.
   */
  onChange?: (value: TOption) => void;
}

interface UseMultiSelectListboxParameters<TOption> extends UseListboxCommonProps<TOption> {
  /**
   * The default selected value. Use when the component is not controlled.
   */
  defaultValue?: TOption[];
  /**
   * If `true`, the component will allow to select multiple options.
   * @default false
   */
  multiple: true;
  /**
   * The selected value. Use when the component is controlled.
   */
  value?: TOption[];
  /**
   * Callback fired when the value changes.
   */
  onChange?: (value: TOption[]) => void;
}

export type UseListboxParameters<TOption> =
  | UseSingleSelectListboxParameters<TOption>
  | UseMultiSelectListboxParameters<TOption>;

export interface OptionState {
  disabled: boolean;
  highlighted: boolean;
  selected: boolean;
}

interface UseListboxRootSlotOwnProps {
  'aria-activedescendant'?: React.AriaAttributes['aria-activedescendant'];
  id?: string;
  onBlur: React.FocusEventHandler;
  onKeyDown: React.KeyboardEventHandler;
  role: React.AriaRole;
  tabIndex: number;
  ref: React.Ref<any>;
}

export type UseListboxRootSlotProps<TOther = {}> = Omit<TOther, keyof UseListboxRootSlotOwnProps> &
  UseListboxRootSlotOwnProps;

interface UseListboxOptionSlotOwnProps {
  'aria-disabled': React.AriaAttributes['aria-disabled'];
  'aria-selected': React.AriaAttributes['aria-selected'];
  id?: string;
  onClick: React.MouseEventHandler;
  role: React.AriaRole;
}

export type UseListboxOptionSlotProps<TOther = {}> = Omit<
  TOther,
  keyof UseListboxOptionSlotOwnProps
> &
  UseListboxOptionSlotOwnProps;
