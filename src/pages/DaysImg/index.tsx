import Taro from '@tarojs/taro'
import React, {useEffect, useState} from "react"
import { View, Input, Text } from '@tarojs/components'
import { AtSearchBar, AtInput } from 'taro-ui'
import _ from 'lodash';

import './index.scss'

const Index: React.FC = () => {
  const [searchVal, setSearchVal] = useState();

  const handleChange = (v) => {
    console.log(v)
    setSearchVal(v)
  }

  const onChange = (v) => {
    console.log(v)
    setSearchVal(v)
  }

  useEffect(() => {
  }, []);

  return (
    <View style={{height: '100vh', backgroundColor: '#fff'}}>
      <AtSearchBar
        value={searchVal}
        onChange={onChange}
      />

      <Input
        style={{display: 'none'}}
      />
    </View>
  )
}

export default Index;

