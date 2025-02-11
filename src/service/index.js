/*
 * @LastEditors: zhanghengxin ezreal.zhang@icewhale.org
 * @LastEditTime: 2023-07-13 12:39:22
 * @FilePath: /CasaOS-UI/main/src/service/index.js
 * @Description:
 *
 * Copyright (c) 2023 by IceWhale, All Rights Reserved.

 */

import { instance } from '@/service/service'
import {
	AppStoreMethodsApi,
	ComposeMethodsApiFactory,
	Configuration,
	InternalMethodsApiFactory
} from '@icewhale/zimaos-appmanagement-openapi'
import { ZerotierMethodsApi } from '@icewhale/casaos-openapi'
import { FileApiFactory, FolderApiFactory, PinMethodsApi } from '@icewhale/icewhale-files-openapi'
import { GPUMethodsApi } from '@icewhale/zimaos-openapi'
import { ModuleMethodsApi } from "@icewhale/zimaos-modmanagement-openapi"
import { StorageMethodsApi } from '@icewhale/zimaos-localstorage-openapi'


const axiosBaseURL =
	process.env.NODE_ENV === 'dev'
		? `${document.location.protocol}//${process.env.VUE_APP_DEV_IP}:${process.env.VUE_APP_DEV_PORT}`
		: ``

// 初始化 openapi 配置
const config = new Configuration({})

const appManagement = {}
appManagement.compose = new ComposeMethodsApiFactory(config, '/v2/app_management', instance)
appManagement.appStore = new AppStoreMethodsApi(config, '/v2/app_management', instance)
const appGrid = new InternalMethodsApiFactory(config, '/v2/app_management', instance)
const appCompose = new ComposeMethodsApiFactory(config, '/v2/app_management', instance)
const zerotier = new ZerotierMethodsApi(config, '/v2/casaos/', instance)
const iceFile = new FileApiFactory(config, '/v2', instance)
const iceFolder = new FolderApiFactory(config, '/v2', instance)
const filesPin = new PinMethodsApi(config, '/v2_1/files', instance)
const storage = new StorageMethodsApi(config, '/v2/local_storage', instance)
const modManagement = new ModuleMethodsApi(config, '/v2/mod_management', instance)
export const iceGpu = new GPUMethodsApi(config, '/v2/zimaos', instance)
export const useOpenAPI = () => {
	return {
		appManagement,
		appGrid,
		appCompose,
		zerotier,
		iceFile,
		iceFolder,
		modManagement,
		filesPin,
		storage
	}
}

export default { appManagement, appGrid, appCompose, zerotier, iceFile, iceFolder, modManagement, filesPin, storage}
