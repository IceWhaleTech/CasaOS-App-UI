const { io } = require('socket.io-client');

let appSocket: any = null;

function getAccessToken() {
	if (typeof window === 'undefined') {
		return '';
	}

	return localStorage.getItem('access_token') || '';
}

function applySocketToken(socket: any, token?: string) {
	const nextToken = token ?? getAccessToken();
	socket.io.opts.query = {
		...(socket.io.opts.query || {}),
		token: nextToken,
	};
}

export function createAppSocket(wsURL: string) {
	const socket = io(wsURL, {
		autoConnect: false,
		transports: ['websocket', 'polling'],
		path: '/v2/message_bus/socket.io/',
		query: {
			token: getAccessToken(),
		},
	});

	socket.io.on('reconnect_attempt', () => {
		applySocketToken(socket);
	});

	appSocket = socket;
	socket.connect();

	return socket;
}

export function syncAppSocketToken(token?: string) {
	if (!appSocket) {
		return;
	}

	const nextToken = token ?? getAccessToken();
	const currentToken = appSocket.io?.opts?.query?.token || '';

	if (currentToken === nextToken) {
		return;
	}

	applySocketToken(appSocket, nextToken);

	if (appSocket.connected) {
		appSocket.disconnect();
		appSocket.connect();
		return;
	}

	if (!appSocket.active) {
		appSocket.connect();
	}
}

export function getAppSocket() {
	return appSocket;
}
