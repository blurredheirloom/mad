import * as Localization from 'expo-localization';
import I18n from 'ex-react-native-i18n';
import it from './it.json';
import en from './en.json';

I18n.translations = {en, it}
I18n.locale = Localization.locale;
I18n.fallbacks = true;

export function localize(name, params = {}) {
   return I18n.t(name, params);
};

export default I18n;