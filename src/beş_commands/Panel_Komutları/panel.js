const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits,StringSelectMenuBuilder,ActivityType } = require("discord.js");
const moment = require("moment")
require('moment-duration-format');
const beş_config = require("../../../beş_config.json")
module.exports = {
name: "oda-panel",
aliases: ["panel"],
execute: async (client, message, args, beş_embed) => {     

    const besbutton = new ActionRowBuilder()
    .addComponents(       
           new ButtonBuilder()
            .setEmoji("<:yildiz:1249818718356242514>")
            .setCustomId('oda-herkes')
            .setLabel(`Odaya girişleri aç`)
            .setStyle('Success'),
            new ButtonBuilder()
            .setEmoji("<:yildiz:1249818718356242514>")
            .setCustomId('user-ekle')
            .setLabel(`Odaya giriş izni ver`)
            .setStyle('Success'),
            new ButtonBuilder()
            .setEmoji("<:yildiz:1249818718356242514>")
            .setCustomId('oda-kilit')
            .setLabel(`Odaya girişleri kapat`)
            .setStyle('Danger'),
            new ButtonBuilder()
            .setEmoji("<:yildiz:1249818718356242514>")
            .setCustomId('user-cıkar')
            .setLabel(`Odadan kullanıcı yasakla`)
            .setStyle('Danger'))
            
            



message.channel.send({content:`> Özel odanızı oluşturduktan sonra alttaki butonlardan özel odayı yönetebilirsiniz.`,components:[besbutton]})
message.delete();



}}