import { Order } from '../types';

const TELEGRAM_BOT_TOKEN = '7772954174:AAH_Nbmb4gKe6QBuOfhcMQfGGhZkM3pzn-0'; // User's actual bot token
const TELEGRAM_CHAT_ID = '7975824806'; // User's actual chat ID

export const sendOrderToTelegram = async (order: Order): Promise<boolean> => {
  try {
    const message = formatOrderMessage(order);
    // Send payment screenshot if available
    if (order.paymentProof) {
      const formData = new FormData();
      formData.append('chat_id', TELEGRAM_CHAT_ID);
      formData.append('photo', order.paymentProof.file);
      formData.append('caption', message);
      formData.append('parse_mode', 'HTML');
      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`, {
        method: 'POST',
        body: formData,
      });
      return response.ok;
    } else {
      // Send text message only
      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'HTML',
        }),
      });
      return response.ok;
    }
  } catch (error) {
    console.error('Failed to send order to Telegram:', error);
    return false;
  }
};

const formatOrderMessage = (order: Order): string => {
  const itemsList = order.items
    .map(item => `• ${item.product.name} x${item.quantity} - $${(item.product.price * item.quantity).toFixed(2)}`)
    .join('\n');

  return `
🛒 <b>New Order Received!</b>

📋 <b>Order ID:</b> ${order.id}
📅 <b>Date:</b> ${order.createdAt.toLocaleString()}

👤 <b>Customer Information:</b>
• Name: ${order.customer.name}
• Email: ${order.customer.email}
• Phone: ${order.customer.phone}
• Telegram: ${order.customer.telegramUsername || 'Not provided'}

🛍️ <b>Items Ordered:</b>
${itemsList}

💰 <b>Total Amount:</b> $${order.total.toFixed(2)}

💳 <b>Payment Method:</b> Vodafone Cash
📱 <b>Payment Number:</b> 01021981265
${order.paymentProof ? '📸 <b>Payment Screenshot:</b> Attached' : ''}

---
Please process this order and contact the customer for delivery details.
  `.trim();
};