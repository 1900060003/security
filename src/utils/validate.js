import i18n from '@/languages'
import { Message } from 'element-ui'

const Tips = false

export function validate(rule, value, callback) {
  try {
    if (rule.required) {
      if (empty(value)) {
        throw new Error(rule.name + i18n.t('validate.required'))
      }
      if (rule.min !== null) {
        if (!isNaN(value) && rule.type === 'number') {
          if (value * 1 < rule.min) {
            throw new Error(rule.name + i18n.t('validate.min') + rule.min)
          }
        } else if (value.constructor === String) {
          if (value.length < rule.min) {
            throw new Error(rule.name + i18n.t('validate.min') + rule.min)
          }
        } else if (value.constructor === Array) {
          if (value.length < rule.min) {
            throw new Error(rule.name + i18n.t('validate.min') + rule.min)
          }
        }
      }

      if (rule.max !== null) {
        if (!isNaN(value) && rule.type === 'number') {
          if (value * 1 > rule.max) {
            throw new Error(rule.name + i18n.t('validate.max') + rule.max)
          }
        } else if (value.constructor === String) {
          if (value.length > rule.max) {
            throw new Error(rule.name + i18n.t('validate.max') + rule.max)
          }
        } else if (value.constructor === Array) {
          if (value.length > rule.max) {
            throw new Error(rule.name + i18n.t('validate.max') + rule.max)
          }
        }
      }

      if (rule.type) {
        if (rule.type === 'email') {
          if (!email(value)) {
            throw new Error(rule.name + i18n.t('validate.type'))
          }
        }
        if (rule.type === 'phone') {
          if (!phone(value)) {
            throw new Error(rule.name + i18n.t('validate.type'))
          }
        }
        if (rule.type === 'username') {
          if (chinese(value)) {
            throw new Error(rule.name + i18n.t('validate.type'))
          }
        }
        if (rule.type === 'passwordConfirm') {
          if (rule.getCheckValue() !== value) {
            throw new Error(rule.name + i18n.t('validate.passwordConfirm'))
          }
        }
      }
    } else {
      if (!empty(value)) {
        if (rule.min !== null) {
          if (!isNaN(value) && rule.type === 'number') {
            if (value * 1 < rule.min) {
              throw new Error(rule.name + i18n.t('validate.min') + rule.min)
            }
          } else if (value.constructor === String) {
            if (value.length < rule.min) {
              throw new Error(rule.name + i18n.t('validate.min') + rule.min)
            }
          } else if (value.constructor === Array) {
            if (value.length < rule.min) {
              throw new Error(rule.name + i18n.t('validate.min') + rule.min)
            }
          }
        }

        if (rule.max !== null) {
          if (!isNaN(value) && rule.type === 'number') {
            if (value * 1 > rule.max) {
              throw new Error(rule.name + i18n.t('validate.max') + rule.max)
            }
          } else if (value.constructor === String) {
            if (value.length > rule.max) {
              throw new Error(rule.name + i18n.t('validate.max') + rule.max)
            }
          } else if (value.constructor === Array) {
            if (value.length > rule.max) {
              throw new Error(rule.name + i18n.t('validate.max') + rule.max)
            }
          }
        }

        if (rule.type) {
          if (rule.type === 'email') {
            if (!email(value)) {
              throw new Error(rule.name + i18n.t('validate.type'))
            }
          }
          if (rule.type === 'phone') {
            if (!phone(value)) {
              throw new Error(rule.name + i18n.t('validate.type'))
            }
          }
          if (rule.type === 'username') {
            if (chinese(value)) {
              throw new Error(rule.name + i18n.t('validate.type'))
            }
          }
        }
      }
    }
  } catch (e) {
    if (Tips) {
      Message({
        message: e,
        type: 'error',
        duration: 3 * 1000
      })
      return
    } else {
      callback(e)
      return
    }
  }
  callback()
}

/*
 * 校验邮箱格式
 */
function email(val) {
  return /^([0-9A-Za-z\-_.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g.test(val)
}

/*
 * 校验手机格式
 */
function phone(val) {
  return /^1[3|4|5|7|8|9][0-9]\d{8}$/g.test(val)
}

/*
 * 判断中文
 */
function chinese(val) {
  return /[\u4e00-\u9fa5]+/.test(val)
}

/*
 * 校验是否为空
 */

function empty(val) {
  if (val === null || val === undefined) {
    return true
  } else if (val.constructor === String) {
    if (val.trim() === '') {
      return true
    } else {
      return false
    }
  } else if (val.constructor === Array) {
    if (val.length > 0) {
      return false
    } else {
      return true
    }
  } else {
    return false
  }
}
