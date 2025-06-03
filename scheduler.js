import schedule from "node-schedule";
import fs from "fs";
import { readGroupSettings, writeGroupSettings } from "../../utils/io-json.js";
import { MessageType } from "../../api-zalo/index.js";
import { handleRandomChartZingMp3 } from "../api-crawl/music/zingmp3.js";
import { getRandomVideoFromArray, searchVideoTiktok } from "../api-crawl/tiktok/tiktok-service.js";
import { sendRandomGirlVideo } from "../chat-zalo/chat-special/send-video/send-video.js";

const scheduledTasks = [
  {
    cronExpression: "0 6 * * *",
    task: async (api) => {
      const caption = `> SendTask 06:00 <\nNgày mới chúc các bạn may mắn!\n\n`;
      const timeToLive = 1000 * 60 * 60 * 12;
      await sendTaskMusic(api, caption, timeToLive);
    },
  },
  {
    cronExpression: "15 6 * * *",
    task: async (api) => {
      const caption =
        `> SendTask 06:15 <\nThức dậy cho một ngày mới\nđầy năng lượng thôi nào!` + `\n\nĐón bình minh ngày mới cùng tớ nhé!!!`;
      const timeToLive = 1000 * 60 * 60 * 12;
      await sendTaskMusic(api, caption, timeToLive);
  },
  {
    cronExpression: "0 7 * * *",
    task: async (api) => {
      const caption =
        `> SendTask 07:00 <\nChào buổi sáng\ncùng đón nắng ấm suơng mưa nhé!` + `\n\nGiải trí một chút để bớt căng thẳng thôi nào!!!`;
      const timeToLive = 1000 * 60 * 60 * 12;
      await sendTaskMusic(api, caption, timeToLive);
    },
  },
  {
    cronExpression: "0 8 * * *",
    task: async (api) => {
      const caption = `> SendTask 08:00 <\nChào một buổi sáng đầy năng lượng!` + `\n\nCung cấp nhạc cho anh em đây!!!`;
      const timeToLive = 1000 * 60 * 60 * 12;
      await sendTaskMusic(api, caption, timeToLive);
    },
  },
  {
    cronExpression: "0 9 * * *",
    task: async (api) => {
      const caption = `> SendTask 09:00 <\nChào một buổi sáng đầy năng lượng!` + `\n\nCung cấp nhạc hay cho anh em đây!!!`;
      const timeToLive = 1000 * 60 * 60 * 12;
      await sendTaskMusic(api, caption, timeToLive);
    },
  },
  {
    cronExpression: "0 10 * * *",
    task: async (api) => {
      const caption = `> SendTask 10:00 <\nChào một buổi trưa đầy năng lượng!` + `\n\nGiải trí với video chill cho anh em đây!!!`;
      const timeToLive = 1000 * 60 * 60 * 12;
      await sendTaskMusic(api, caption, timeToLive, "ngắm hoàng hôn chill");
    },
  },
  {
    cronExpression: "0 11 * * *",
    task: async (api) => {
      const caption = `> SendTask 11:00 <\nChào một buổi trưa đầy năng lượng!` + `\n\nGiải trí nhạc cho bớt căng não anh em nhé!!!`;
      const timeToLive = 1000 * 60 * 60 * 12;
      await sendTaskMusic(api, caption, timeToLive);
    },
  },
  {
    cronExpression: "0 12 * * *",
    task: async (api) => {
      const caption = `> SendTask 12:00 <\nChào một buổi chiều đầy năng lượng!` + `\n\nCung cấp nhạc cho anh em đây!!!`;
      const timeToLive = 1000 * 60 * 60 * 12;
      await sendTaskMusic(api, caption, timeToLive);
    },
  },
  {
    cronExpression: "0 13 * * *",
    task: async (api) => {
      const caption = `> SendTask 13:00 <\nChào một buổi chiều đầy năng lượng!` + `\n\nCung cấp nhạc chill cho anh em đây!!!`;
      const timeToLive = 1000 * 60 * 60 * 12;
      await sendTaskMusic(api, caption, timeToLive, "nhạc chill");
    },
  },
  {
    cronExpression: "0 14 * * *",
    task: async (api) => {
      const caption = `> SendTask 14:00 <\nChào một buổi xế chiều đầy năng lượng!` + `\n\nGiải trí với nhạc cho anh em đây!!!`;
      const timeToLive = 1000 * 60 * 60 * 12;
      await sendTaskMusic(api, caption, timeToLive);
    },
  },
  {
    cronExpression: "0 15 * * *",
    task: async (api) => {
      const caption = `> SendTask 15:00 <\nChúc buổi chiều thật chill và vui vẻ nhé!` + `\n\nCung cấp nhạc chill cho anh em nhé`;
      const timeToLive = 1000 * 60 * 60 * 12;
      await sendTaskMusic(api, caption, timeToLive);
    },
  },
  {
    cronExpression: "0 16 * * *",
    task: async (api) => {
      const caption = `> SendTask 16:00 <\nChúc các bạn một buổi chiều vui vẻ bên gia đình!` + `\n\nThư giãn cuối ngày thôi nào!!!`;
      const timeToLive = 1000 * 60 * 60 * 12;
      await sendTaskMusic(api, caption, timeToLive);
    },
  },
  {
    cronExpression: "0 17 * * *",
    task: async (api) => {
      const caption = `> SendTask 17:00 <\nChúc biểu chiều thật chill và vui vẻ nhé` + `\nĐón Hoàng Hôn Ánh Triều Tà Nào\n\n`;
      const timeToLive = 1000 * 60 * 60 * 24;
      await sendTaskVideo(api, caption, timeToLive);
    },
  },
  {
    cronExpression: "0 18 * * *",
    task: async (api) => {
      const caption = `> SendTask 18:00 <\nChúc các bạn một buổi tối vui vẻ bên gia đình!\n\n`;
      const timeToLive = 1000 * 60 * 60 * 12;
      await sendTaskMusic(api, caption, timeToLive);
    },
  },
    {
    cronExpression: "0 19 * * *",
    task: async (api) => {
      const caption = `> SendTask 19:00 <\nGiải trí bằng 1 bài nhạc nhé\n\n`;
      const timeToLive = 1000 * 60 * 60 * 12;
      await sendTaskMusic(api, caption, timeToLive);
    },
  },
  {
    cronExpression: "0 20 * * *",
    task: async (api) => {
      const caption =
        `> SendTask 20:00 <\Buối tối vui vẻ bên gia đình nhé anh em\nđầy năng lượng thôi nào!` + `\n\nĐón bình minh ngày mới cùng tớ nhé!!!`;
      const timeToLive = 1000 * 60 * 60 * 12;
      await sendTaskMusic(api, caption, timeToLive);
    },
  },
    {
    cronExpression: "0 21 * * *",
    task: async (api) => {
      const caption = `> SendTask 21:00 <\nChúc các bạn một buổi tối vui vẻ bên gia đình!\n\n`;
      const timeToLive = 1000 * 60 * 60 * 12;
      await sendTaskMusic(api, caption, timeToLive);
    },
  },
    {
    cronExpression: "0 22 * * *",
    task: async (api) => {
      const caption = `> SendTask 22:00 <\nChúc các bạn Ngủ Ngon 😴 và phát nhạc chill cho dễ ngủ nhé\n\n`;
      const timeToLive = 1000 * 60 * 60 * 12;
      await sendTaskMusic(api, caption, timeToLive);
    },
  },
    {
    cronExpression: "0 23 * * *",
    task: async (api) => {
      const caption = `> SendTask 23:00 <\nSao Các Bạn Chưa Ngủ!!!` + `\n\nThôi Được Để Bot Mở Nhạc Cho Nghe Rồi Ngủ Nhé!!!`; 
      const timeToLive = 1000 * 60 * 60 * 12;
      await sendTaskMusic(api, caption, timeToLive);
    },
  },
   {
    cronExpression: "0 0 * * *",
    task: async (api) => {
      const caption = `> SendTask 00:00 <\n Đón Ngày Mới Nào Các Bạn` + `\n\nĐể Bot mở nhạc cho nghe nhá !!!`;
      const timeToLive = 1000 * 60 * 60 * 12;
      await sendTaskMusic(api, caption, timeToLive);
    },
  },
   {
    cronExpression: "0 1 * * *",
    task: async (api) => {
      const caption = `> SendTask 01:00 <\nAi còn cày đêm thế này? Có nhạc chill cho bạn đây!\n\n`;
      const timeToLive = 1000 * 60 * 60 * 12;
      await sendTaskMusic(api, caption, timeToLive);
    },
  },
   {
    cronExpression: "0 2 * * *",
    task: async (api) => {
      const caption = `> SendTask 2:00 <\nNgày mới chúc các bạn may mắn!\n\n`;
      const timeToLive = 1000 * 60 * 60 * 12;
      await sendTaskMusic(api, caption, timeToLive);
    },
  },
   {
    cronExpression: "0 3 * * *",
    task: async (api) => {
      const caption = `> SendTask 03:00 <\nLo Ngủ Đi Các Bạn,Để Bot Mở Nhạc Chill Nhé\n\n`;
      const timeToLive = 1000 * 60 * 60 * 12;
      await sendTaskMusic(api, caption, timeToLive);
    },
  },
   {
    cronExpression: "0 4 * * *",
    task: async (api) => {
      const caption = `> SendTask 04:00 <\nChào Ngày Mới Tốt Lành\n\n`;
      const timeToLive = 1000 * 60 * 60 * 12;
      await sendTaskMusic(api, caption, timeToLive);
    },
  },
   {
    cronExpression: "0 5 * * *",
    task: async (api) => {
      const caption = `> SendTask 05:00 <\nChúc các bạn một Ngày mới tốt lành` + `\n\nĐón Ngày Bình Minh Cùng Tớ Nhé`;
      const timeToLive = 1000 * 60 * 60 * 12;
      await sendTaskVideo(api, caption, timeToLive);
    },
  },
];

async function sendTaskGirlVideo(api, caption, timeToLive, type = "default") {
  const groupSettings = readGroupSettings();
  for (const threadId of Object.keys(groupSettings)) {
    if (groupSettings[threadId].sendTask) {
      try {
        const message = {
          threadId: threadId,
          type: MessageType.GroupMessage,
        };
        await sendRandomGirlVideo(api, message, caption, type, timeToLive);
      } catch (error) {
        console.error(`Lỗi khi gửi video gái in ${threadId}:`, error);
        if (error.message && error.message.includes("Không tồn tại")) {
          groupSettings[threadId].sendTask = false;
          writeGroupSettings(groupSettings);
        }
      }
    }
  }
}

async function sendTaskVideo(api, caption, timeToLive, query) {
  const chillListVideo = await searchVideoTiktok(query);
  if (chillListVideo) {
    const groupSettings = readGroupSettings();
    let captionFinal = `${caption}`;
    for (const threadId of Object.keys(groupSettings)) {
      if (groupSettings[threadId].sendTask) {
        try {
          const message = {
            threadId: threadId,
            type: MessageType.GroupMessage,
          };
          const videoUrl = await getRandomVideoFromArray(api, message, chillListVideo);
          await api.sendVideo({
            videoUrl: videoUrl,
            threadId: message.threadId,
            threadType: message.type,
            message: {
              text: captionFinal,
            },
            ttl: timeToLive,
          });
        } catch (error) {
          console.error(`Lỗi khi gửi video tiktok in ${threadId}:`, error);
          if (error.message && error.message.includes("Không tồn tại")) {
            groupSettings[threadId].sendTask = false;
            writeGroupSettings(groupSettings);
          }
        }
      }
    }
  }
}

async function sendTaskMusic(api, caption, timeToLive) {
  const groupSettings = readGroupSettings();
  for (const threadId of Object.keys(groupSettings)) {
    if (groupSettings[threadId].sendTask) {
      try {
        const message = {
          threadId: threadId,
          type: MessageType.GroupMessage,
        };
        await handleRandomChartZingMp3(api, message, caption, timeToLive);
      } catch (error) {
        console.error(`Lỗi khi gửi nhạc in ${threadId}:`, error);
        if (error.message && error.message.includes("Không tồn tại")) {
          groupSettings[threadId].sendTask = false;
          writeGroupSettings(groupSettings);
        }
      }
    }
  }
}

export async function initializeScheduler(api) {
  scheduledTasks.forEach((taskConfig) => {
    schedule.scheduleJob(taskConfig.cronExpression, () => {
      taskConfig.task(api).catch((error) => {
        console.error("Lỗi khi thực thi tác vụ định kỳ:", error);
      });
    });
  });
}
