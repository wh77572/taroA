import React, {Component, PropsWithChildren} from "react";
import { View } from '@tarojs/components'

import './index.scss'

const Index: React.FC = () => {
  return (
    <View style={{
      height: '100vh',
      backgroundColor: '#fff',
      color: '#888',
      textAlign: 'center',
      marginTop: 80
    }}
    >
      给我老婆大美媛记录每天穿搭用的！
    </View>
  )
};

export default Index;
