import React, { FunctionComponent } from 'react'
import { StyleSheet, View, SafeAreaView, StatusBar } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Headline } from 'react-native-paper'
import { Remote } from '../../components/Remote'

export const RemotePage: FunctionComponent = () => {
  const { t } = useTranslation()
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Headline>{t('remote.control_the_arms')}</Headline>

        <View style={styles.pageContent}>
          <Remote />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
    height: '100%',
  },
  pageContent: {
    marginTop: 'auto',
  },
})
