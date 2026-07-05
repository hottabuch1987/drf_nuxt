import json
from channels.generic.websocket import AsyncWebsocketConsumer

class UserConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Принимаем соединение
        await self.accept()
        # Отправляем приветственное сообщение
        await self.send(text_data=json.dumps({
            'type': 'connection_established',
            'message': 'You are connected to the WebSocket server.'
        }))

    async def disconnect(self, close_code):
        # Действия при отключении (опционально)
        print(f'Disconnected with code: {close_code}')

    async def receive(self, text_data):
        # Получаем данные от клиента
        try:
            data = json.loads(text_data)
            message = data.get('message', '')
        except json.JSONDecodeError:
            message = text_data

        # Отправляем ответ (эхо)
        await self.send(text_data=json.dumps({
            'type': 'echo',
            'message': f'Echo: {message}'
        }))