console.log("Loading...")
const Discord = require('discord.js')
const fs = require('fs')

const config = JSON.parse(fs.readFileSync('config.json', 'utf-8'))

const client =new Discord.Client()

client.on('ready', function() {
    console.log('Bot ist als ' + client.user.tag + ' eingeloggt!')
    console.log('Der Bot ist auf ' + client.guilds.cache.size + ' Server/n')
})

client.on('message', function(message) {
    if(message.guild && !message.author.bot) {
        var SentMessageChannel = 'Channel-' + message.channel.name
        var SentMessageUser = 'Benutzer: ' + message.author.tag
        var SentMessageContent = 'Nachricht: ' + message.content
        var SentMessageTime = message.createdAt.getHours() + ':' + message.createdAt.getMinutes() + ' Uhr'
        var SentMessageDate = message.createdAt.getFullYear() + '-' + (message.createdAt.getMonth() + 1) + '-' + message.createdAt.getDate()
        console.log(SentMessageDate)
        console.log(SentMessageTime)
        console.log(SentMessageChannel)
        console.log(SentMessageUser)
        console.log(SentMessageContent)
        fs.appendFileSync('.\\logs\\' + SentMessageChannel + SentMessageDate + '.log','Uhrzeit: ' + SentMessageDate + ' ' + SentMessageTime + '\n' + SentMessageUser + '\n' + SentMessageContent, function (err) {
            if(err) return console.error(err)
        })
        fs.writeFileSync('.\\logs\\' + SentMessageChannel + SentMessageDate + '_temp.log','Datum/Uhrzeit: ' + SentMessageDate + ' ' + SentMessageTime + '\n' + SentMessageChannel + '\n' + SentMessageUser + '\n' + SentMessageContent, function (err) {
            if(err) return console.error(err)
        })
        var messageArray = fs.readFileSync('.\\logs\\' + SentMessageChannel + SentMessageDate + '_temp.log', function(err) {
            if(err) return console.error(err)
        }).toString().split("\n");
        for(i in messageArray) {
            if(i == 0) {
                client.channels.cache.get('796341865938157569').send('-----------------------------------')
            }

            client.channels.cache.get('796341865938157569').send(messageArray[i])
            
            if(i == 3) {
                client.channels.cache.get('796341865938157569').send('-----------------------------------')
            }
        }
    }
    if(!message.guild && !message.author.bot) {
        message.channel.send('Privatnachrichten sind nicht erlaubt! Bitte stelle Fragen im "❓fragen❓" Channel.')
    }
})
client.login(config.token)