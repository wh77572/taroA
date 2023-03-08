import Taro from '@tarojs/taro'
import React, {useEffect, useState} from "react"
import { View, Textarea } from '@tarojs/components'
import {AtTag, AtNoticebar, AtImagePicker, AtTextarea, AtButton} from 'taro-ui'
import * as dayjs from 'dayjs'
import dayOfYear from 'dayjs/plugin/dayOfYear'
import _ from 'lodash';

import './index.scss'

dayjs.extend(dayOfYear)

const Index: React.FC = () => {
  const [dayToStr, setDayToStr] = useState<any>();
  const [textValue, setTextValue] = useState<any>();
  const [days] = useState(['日', '一', '二', '三', '四', '五', '六']);
  const [fileImgs, setFileImgs] = useState<any>([]);
  const [tagArr] = useState([
    {
      label: '甜酷',
      value: 'sweet',
    },
    {
      label: '淑女',
      value: 'lady',
    },
    {
      label: '休闲',
      value: 'relaxation',
    },
    {
      label: '文艺',
      value: 'art',
    },
    {
      label: '运动',
      value: 'move',
    },
    {
      label: '职正',
      value: 'job',
    },
  ]);
  const [tagName, setTagName] = useState<any>([]);

  const onChange = (files: any, type, index) => {
    setFileImgs(files);
  }

  const handleText = (e) => {
    setTextValue(e);
  }

  const handleTag = (e) => {
    let names;
    if (_.findIndex(tagName, a => a === e.name) > -1) {
      names = _.filter(tagName, a => a !== e.name)
    } else {
      names = _.uniq([...tagName, e.name]);
    }

    setTagName(names);
  };

  const handleSave = () => {
    let logInfos;

    try {
      const logs = Taro.getStorageSync('logInfos');
      const time = dayjs().format("YYYY-MM-DD");
      let findDay = _.findIndex(logs, a => a?.time === time);

      if (findDay > -1) {
        logInfos = _.map(logs, a => {
          if (a.time === time) {
            return {
              time,
              textValue,
              fileImgs,
              tagName,
            }
          }
        });
      } else {
        logInfos = [
          ...logs,
          {
            time,
            textValue,
            fileImgs,
            tagName,
          }
        ];
      }
    } catch (e) {

    }

    Taro.setStorage({
      key: 'logInfos',
      data: logInfos
    })
  }

  useEffect(() => {
    const num = dayjs().day();
    setDayToStr(days[num]);
  }, []);

  return (
    <View style={{height: '100vh', backgroundColor: '#fff'}}>
      <AtNoticebar>
        <View style={{display: 'flex'}}>
          时间:
          {
            dayjs().format("YYYY-MM-DD")
          }

          <View style={{margin: '0 10px'}}>
          第{dayjs().dayOfYear()}天
          </View>

          周{dayToStr}
        </View>
      </AtNoticebar>

      <View style={{padding: 10}}>
        <View style={{color: '#888'}}>心情log</View>
        <View>
          <AtTextarea
            value={textValue}
            height={200}
            maxLength={300}
            placeholder='今天的心情是怎样呢'
            onChange={handleText}
          />
          <Textarea
            style={{display: 'none'}}
          />
        </View>

        <View style={{color: '#888', marginTop: 16}}>今日份穿搭</View>
        <AtImagePicker
          files={fileImgs}
          onChange={onChange}
          onImageClick={(index, fs) => console.log(index, fs)}
        />

        <View style={{color: '#888', marginTop: 16}}>风格</View>

        <View style={{marginTop: 16, display: 'flex', flexWrap: 'wrap'}}>
          {
            tagArr.map((a) => {
              return (
                <View
                  style={{
                    margin: '0 10px 10px 0'
                  }}
                >
                  <AtTag
                    key={a.value}
                    name={a.value}
                    type='primary'
                    circle
                    active={_.findIndex(tagName, (b) => b === a.value) !== -1}
                    onClick={handleTag}
                  >
                    {a.label}
                  </AtTag>
                </View>
              )
            })
          }
        </View>

        <View style={{marginTop: 40}}>
          <AtButton
            type='primary'
            onClick={handleSave}
          >
            保存
          </AtButton>
        </View>
      </View>
    </View>
  )
}

export default Index;

