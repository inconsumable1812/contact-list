import React from 'react';
import PhoneInputWithCountry, {
  DefaultFormValues
} from 'react-phone-number-input/react-hook-form';
import 'react-phone-number-input/style.css';
import ru from 'react-phone-number-input/locale/ru.json';
import { Control } from 'react-hook-form';

import { E164Number } from 'shared/types';
import { parsePhoneNumber } from 'react-phone-number-input';
import { CountryCode } from 'libphonenumber-js/min';

type CustomProps = {
  onChange: (event: { target: { name: string; value: E164Number } }) => void;
  value: E164Number;
  name: string;
  control: Control<DefaultFormValues, string | undefined>;
  rules: Record<string, any>;
};

export const PhoneInputCustom = React.forwardRef<HTMLElement, CustomProps>(
  function PhoneInputCustom(props, ref) {
    const { onChange, value, control, rules, ...other } = props;
    const phone = parsePhoneNumber(value ?? '');
    let country: CountryCode = 'RU';
    if (phone !== undefined) {
      country = phone.country ? phone.country : 'RU';
    }

    return (
      <PhoneInputWithCountry
        {...other}
        name="phone"
        rules={rules}
        control={control}
        defaultCountry={country}
        countryCallingCodeEditable={false}
        international
        inputRef={ref}
        labels={ru}
        onChange={(value: E164Number) => {
          onChange({ target: { name: props.name, value } });
        }}
        value={value}
      />
    );
  }
);
