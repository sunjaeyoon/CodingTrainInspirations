# -*- coding: utf-8 -*-
"""
Created on Fri May 15 16:41:11 2020

@author: AwwTim
"""

import tensorflow as tf
import numpy as np
import cv2
import matplotlib.pyplot as plt
import matplotlib.animation as animation
import matplotlib


resolution = 20

def writeArr(ys):
    arr = np.empty([100,100])
    index = 0
    for y in range(0,100,5):
        for x in range(0,100,5):
            #print(ys[index])
            for yy in range(5):
                for xx in range(5):
                    #print(y+yy, x+xx)
                    arr[y+yy][x+xx] = ys[index]
            index += 1
    return arr

def xorAI():
    inputs = tf.keras.Input(shape=(2))
    x = tf.keras.layers.Dense(16, activation=tf.nn.sigmoid)(inputs)
    outputs = tf.keras.layers.Dense(1, activation=tf.nn.sigmoid)(x)
    model = tf.keras.Model(inputs=inputs, outputs=outputs)
    optimizer = "adam"
    model.compile(optimizer = optimizer, loss = "mean_squared_error",
              )
    #model.summary()
    
    return model

model = xorAI()  
        
train_xs =np.array([
    [0,0],
    [1,0],
    [0,1],
    [1,1]
    ], "float32")

train_ys =np.array([
    [0],
    [1],
    [1],
    [0]
    ], "float32")

cols = 400 // (resolution)
rows = 400 // (resolution)

xs = []
for i in range(cols):
    for j in range(rows):
        x1 = i/cols
        x2 = j/rows
        xs.append([x1,x2])

#out = cv2.VideoWriter('output.mp4', -1, 20.0, (100,100))    

fig =plt.figure()
collection = []#np.empty([100,100,100])
for i in range(5000):
    print(i)
    model.fit(train_xs, train_ys, shuffle = True, epochs = 1, verbose = None)
    ys = model.predict(xs)
    imarr = writeArr(ys)
    im = plt.imshow(imarr, animated = True)
    collection.append([im]) 
    
ani = animation.ArtistAnimation(fig, collection, interval=50, blit=True,
                              repeat_delay=1000)
ani.save('xor.htm')
#plt.show()
    #out.write(img)
#plt.figure()
#plt.imshow()
# Release everything if job is finished
#cap.release()
#out.release()
#cv2.destroyAllWindows()


    

            
            
            
        
    

    

    


