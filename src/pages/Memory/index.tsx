import Taro, {useDidShow} from '@tarojs/taro'
import React, {Component, PropsWithChildren, useEffect, useState} from 'react'
import { View, Image } from '@tarojs/components'
import { AtCard, AtImagePicker } from 'taro-ui'
import _ from 'lodash'

import './index.scss'
import * as dayjs from "dayjs";

const Index: React.FC = () => {
  const [dayToStr, setDayToStr] = useState<any>();
  const [days] = useState(['日', '一', '二', '三', '四', '五', '六']);
  const [logInfos, setLogInfos] = useState<any>();

  const getInfos = () => {
    try {
      const logs = Taro.getStorageSync('logInfos');
      console.log(logs);
      setLogInfos(logs);
    } catch (e) {

    }
  };

  useDidShow(() => {
    const num = dayjs().day();
    setDayToStr(days[num]);

    getInfos();
  });

  return (
    <View>
      {
        _.map(logInfos, (a, index) => {
          return (
            <AtCard
              key={index}
              title={a.time}
              extra={`周${dayToStr}`}
              note='小Tips'
            >
              <View style={{marginBottom: 20}}>
                当天心情:
                <View>{a?.textValue}</View>
              </View>

              {
                a?.fileImgs?.map(b => {
                  return (
                    <Image
                      src={b?.url}
                      onClick={() => {
                        Taro.previewImage({
                          current: b?.url,
                          urls: [b?.url]
                        })
                      }}
                    />
                  )
                })
              }
            </AtCard>
          )
        })
      }
    </View>
  )
};

export default Index;
