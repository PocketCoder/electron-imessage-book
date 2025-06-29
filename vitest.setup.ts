import '@testing-library/jest-dom/vitest';

import { vi } from 'vitest';

vi.mock('electron', () => {
	const ipcMainMock = { handle: vi.fn() };
	const appMock = { whenReady: vi.fn(() => Promise.resolve()), on: vi.fn() };
	const WinMock = vi.fn(() => ({
		/* your window mocks */
	}));
	const BrowserWindowMock = vi.fn(() => ({
		on: vi.fn(),
		show: vi.fn(),
		loadURL: vi.fn(),
		loadFile: vi.fn(),
		webContents: { setWindowOpenHandler: vi.fn() },
	}));
	const shellMock = { openExternal: vi.fn() };

	return {
		__esModule: true,
		default: {
			ipcMain: ipcMainMock,
			app: appMock,
			BrowserWindow: BrowserWindowMock,
			shell: shellMock,
		},
		ipcMain: ipcMainMock,
		app: appMock,
		BrowserWindow: BrowserWindowMock,
		shell: shellMock,
	};
});
