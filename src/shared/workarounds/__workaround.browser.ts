
/*
 * THIS IS TEMPORARY TO PATCH 2.1.1+ Core bugs
 */

/* tslint:disable */
let __compiler__ = require('@angular/compiler');
import { __platform_browser_private__ } from '@angular/platform-browser';
import { __core_private__ } from '@angular/core';
if (!__core_private__['ViewUtils']) {
    __core_private__['ViewUtils'] = __core_private__['view_utils'];
}



if (__compiler__ && __compiler__.SelectorMatcher && __compiler__.CssSelector) {
    (__compiler__).__compiler_private__ = {
        SelectorMatcher: __compiler__.SelectorMatcher,
        CssSelector: __compiler__.CssSelector
    }
}
