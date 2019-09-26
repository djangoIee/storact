import { COMMON_TYPE } from '../../src'

export default {
  markCurrentTime: ({ dispatch }) => async () => {
    try {
      const result = await fetch('http://api.m.taobao.com/rest/api3.do?api=mtop.common.getTimestamp').then(res => res.json())
      dispatch[COMMON_TYPE.PUSH]({
        keys: ['dates'],
        data: `当前时间：${result.data.t}`,
      })
    } catch (e) {
      throw e
    }
  },
  click: ({ getState, dispatch }) => async (a, b) => {
    const currentTimes = getState().get('times')
    dispatch[COMMON_TYPE.PUSH]({
      keys: ['dates'],
      data: Date.now(),
    })
    await dispatch[COMMON_TYPE.UPDATE]({
      keys: ['times'],
      data: currentTimes + ((+a + +b) || 1),
    })
  },
  clickTwice: ({ dispatch }) => async () => {
    await dispatch.click()
    await dispatch.click()
  },
}
