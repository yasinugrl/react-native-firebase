/*
 * Copyright (c) 2016-present Invertase Limited & Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this library except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import {
  createModuleNamespace,
  FirebaseModule,
  getFirebaseRoot,
} from '@react-native-firebase/app/lib/internal';

import version from './version';
import { isFunction, isNumber, isString } from '@react-native-firebase/app/lib/common';

import validateNotification from './validateNotification';
import validateSchedule from './validateSchedule';

import AndroidBadgeIconType from './AndroidBadgeIconType';
import AndroidCategory from './AndroidCategory';
import AndroidGroupAlertBehavior from './AndroidGroupAlertBehavior';
import AndroidPriority from './AndroidPriority';
import AndroidVisibility from './AndroidVisibility';
import AndroidRepeatInterval from './AndroidRepeatInterval';

const statics = {
  AndroidBadgeIconType,
  AndroidCategory,
  AndroidGroupAlertBehavior,
  AndroidPriority,
  AndroidVisibility,
  AndroidRepeatInterval,
};

const namespace = 'notifications';

const nativeModuleName = 'RNFBNotificationsModule';

class FirebaseNotificationsModule extends FirebaseModule {
  cancelAllNotifications() {
    return this.native.cancelAllNotifications();
  }

  cancelNotification(notificationId) {
    if (!isString(notificationId)) {
      throw new Error(
        "firebase.notifications().cancelNotification(*) 'notificationId' expected a string value.",
      );
    }

    return this.native.cancelNotification(notificationId);
  }

  displayNotification(notification) {
    // let options;
    // try {
    //   options = validateNotification(notification);
    // } catch (e) {
    //   throw new Error(`firebase.notifications().displayNotification(*) ${e.message}`);
    // }
    return this.native.displayNotification(notification);
  }

  getBadge() {
    return this.native.getBadge();
  }

  getInitialNotification() {
    return this.native.getInitialNotification();
  }

  getScheduledNotifications() {
    return this.native.getScheduledNotifications();
  }

  onNotification(observer) {
    if (!isFunction(observer)) {
      throw new Error("firebase.notifications().onNotification(*) 'observer' expected a function.");
    }

    // todo return subscriber
  }

  onNotificationDisplayed(observer) {
    if (!isFunction(observer)) {
      throw new Error(
        "firebase.notifications().onNotificationDisplayed(*) 'observer' expected a function.",
      );
    }

    // todo return subscriber
  }

  onNotificationOpened(observer) {
    if (!isFunction(observer)) {
      throw new Error(
        "firebase.notifications().onNotificationOpened(*) 'observer' expected a function.",
      );
    }

    // todo return subscriber
  }

  removeAllDeliveredNotifications() {
    return this.native.removeAllDeliveredNotifications();
  }

  removeDeliveredNotification(notificationId) {
    if (!isString(notificationId)) {
      throw new Error(
        "firebase.notifications().removeDeliveredNotification(*) 'notificationId' expected a string value.",
      );
    }

    return this.native.removeDeliveredNotification();
  }

  scheduleNotification(notification, schedule) {
    let notificationOptions;
    try {
      notificationOptions = validateNotification(notification);
    } catch (e) {
      throw new Error(`firebase.notifications().scheduleNotification(*) ${e.message}`);
    }

    let scheduleOptions;
    try {
      scheduleOptions = validateSchedule(schedule);
    } catch (e) {
      throw new Error(`firebase.notifications().scheduleNotification(_, *) ${e.message}`);
    }

    return this.native.scheduleNotification(notificationOptions, scheduleOptions);
  }

  setBadge(badge) {
    if (!isNumber(badge)) {
      throw new Error(
        "firebase.notifications().removeDeliveredNotification(*) 'badge' expected a number value.",
      );
    }

    // TODO can it be negative?
    if (badge < 0) {
      throw new Error(
        "firebase.notifications().removeDeliveredNotification(*) 'badge' value must be greater than 0.",
      );
    }

    return this.native.setBadge(badge);
  }
}

// import { SDK_VERSION } from '@react-native-firebase/notifications';
export const SDK_VERSION = version;

// import notifications from '@react-native-firebase/notifications';
// notifications().X(...);
export default createModuleNamespace({
  statics,
  version,
  namespace,
  nativeModuleName,
  nativeEvents: false,
  hasMultiAppSupport: false,
  hasCustomUrlOrRegionSupport: false,
  ModuleClass: FirebaseNotificationsModule,
});

// import notifications, { firebase } from '@react-native-firebase/notifications';
// notifications().X(...);
// firebase.notifications().X(...);
export const firebase = getFirebaseRoot();

export AndroidBadgeIconType from './AndroidBadgeIconType';
export AndroidCategory from './AndroidCategory';
export AndroidGroupAlertBehavior from './AndroidGroupAlertBehavior';
export AndroidPriority from './AndroidPriority';
export AndroidVisibility from './AndroidVisibility';
export AndroidRepeatInterval from './AndroidRepeatInterval';