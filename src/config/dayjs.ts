import { locale } from '@translations';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

import 'dayjs/locale/ar';
import 'dayjs/locale/en';
import 'dayjs/locale/es';
import 'dayjs/locale/fa';
import 'dayjs/locale/fr';
import 'dayjs/locale/id';
import 'dayjs/locale/it';
import 'dayjs/locale/ja';
import 'dayjs/locale/ko';
import 'dayjs/locale/ms';
import 'dayjs/locale/pl';
import 'dayjs/locale/pt';
import 'dayjs/locale/ru';
import 'dayjs/locale/uk';
import 'dayjs/locale/vi';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/zh-hk';

dayjs.extend(localizedFormat)

locale.subscribe(val => {
  if (val) {

    dayjs.locale(val.toLocaleLowerCase())
    // 执行其他操作
    console.log('locale changed to:', val)
  }

})