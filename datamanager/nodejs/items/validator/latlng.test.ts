import ItemValidatorLatLng from './latlng'

describe('items/validator/latlng', () => {
	const latLngValidator = new ItemValidatorLatLng()
	//10進表記で小数点以下6桁か。
	//6桁に揃えるためにstring型になっているか。

	test('半角文字かどうか', () => {
		expect(() => latLngValidator.validateDataType(1000)).toThrow(
			'緯度、経度は文字列である必要があります。'
		)
		expect(() => latLngValidator.validateDataType(true)).toThrow(
			'緯度、経度は文字列である必要があります。'
		)
	})

	test('少数点6桁かどうか', () => {
		expect(() => latLngValidator.validateDataType('120')).toThrow(
			'緯度、経度は10進数、小数点以下6桁である必要があります。'
		)
		expect(() => latLngValidator.validateDataType('moji.123456')).toThrow(
			'緯度、経度は10進数、小数点以下6桁である必要があります。'
		)
		expect(() => latLngValidator.validateDataType('120.moji')).toThrow(
			'緯度、経度は10進数、小数点以下6桁である必要があります。'
		)
		expect(() => latLngValidator.validateDataType('120.123')).toThrow(
			'緯度、経度は10進数、小数点以下6桁である必要があります。'
		)
	})

	test('緯度が日本の範囲に入っているか', () => {
		expect(latLngValidator.validateLat('25.000001')).toBe(undefined)
		expect(() => latLngValidator.validateLat('40')).toThrow(
			'緯度、経度は10進数、小数点以下6桁である必要があります。'
		)
		expect(() => latLngValidator.validateLat('50.123456')).toThrow(
			'緯度が日本の範囲から外れている可能性があります。'
		)
		expect(() => latLngValidator.validateLat('19.123456')).toThrow(
			'緯度が日本の範囲から外れている可能性があります。'
		)
		expect(() => latLngValidator.validateLat('-19.123456')).toThrow(
			'緯度が日本の範囲から外れている可能性があります。'
		)
	})

	test('経度が日本の範囲に入っているか', () => {
		expect(latLngValidator.validateLng('125.000001')).toBe(undefined)
		expect(() => latLngValidator.validateLng('40')).toThrow(
			'緯度、経度は10進数、小数点以下6桁である必要があります。'
		)
		expect(() => latLngValidator.validateLng('160.123456')).toThrow(
			'経度が日本の範囲から外れている可能性があります。'
		)
		expect(() => latLngValidator.validateLng('100.123456')).toThrow(
			'経度が日本の範囲から外れている可能性があります。'
		)
		expect(() => latLngValidator.validateLng('-100.123456')).toThrow(
			'経度が日本の範囲から外れている可能性があります。'
		)
	})
})
