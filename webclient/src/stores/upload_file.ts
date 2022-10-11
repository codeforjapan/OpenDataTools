import { atom } from 'recoil';
import { AtomKeys } from './recoil_keys';

export const uploadedFileBufferAtom = atom<{ fileName: string; buffer: Buffer } | null>({
  key: AtomKeys.uploadedFileBuffer,
  default: null,
});
