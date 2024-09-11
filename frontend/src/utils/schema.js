import * as yup from 'yup';

export const signUpSchema = (t) => yup.object().shape({
  username: yup.string().min(3, t('valid.minmax')).max(20, t('valid.minmax')).required(t('valid.required')),
  password: yup.string().min(6, t('valid.minPassword')).required(t('valid.required')),
  confirmPassword: yup.string().oneOf([yup.ref('password')], t('valid.confirm')),
});

export const newChannelSchema = (t, channels) => yup.object().shape({
  body: yup.string().required(t('valid.required'))
    .min(3, t('valid.minmax'))
    .max(20, t('valid.minmax'))
    .notOneOf(channels, t('valid.unique')),
});
