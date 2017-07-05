from bs4 import BeautifulSoup
import requests
import json
import html5lib
# import cgi

def dataParser(prodUrl):

	soup 			= BeautifulSoup(requests.get(prodUrl).text.encode('utf-8'), 'html5lib')

	try:
		itemPrice 	= soup.find('meta', {'itemprop':'priceCurrency'}).find_next('span').text
	except:
		itemPrice 	= soup.find('span', {'class':'pricesale'}).text

	description	= soup.find('div', {'itemprop':'description'})

	return itemPrice, description


def seeder(baseUrl):

  	jsonFile = open('products.json', 'a')
	jsonFile.write('[')
 	jsonData = {}

	soup = BeautifulSoup(requests.get(baseUrl).text.encode('utf-8'), 'html5lib')
	productUrls = soup.find_all('td', {'class':'thumbtext newDir2017'})

	for products in productUrls:

		prod 		= products.find('span', {'class':'familyPname'})
		prodName	= prod.text.strip()
		prodUrl 	= 'http://www.partycity.com' + prod.find_previous('a').get('href')
		prodImage 	= products.find('img', {'class':'minithumbborder'}).get('imgsrc')
		prodId 		= prodImage.split('/')[-1].replace('_full', '').strip()

		parsedData = dataParser(prodUrl)

		print prodId
		print '\n'

		jsonData['productId']    = int(prodId.replace('P', '').replace('&$hide_clearance=0', ''))
		jsonData['name']  		 = prodName
		jsonData['price']	  	 = parsedData[0]
		jsonData['sourceUrl']    = prodUrl
		jsonData['thumbnailUrl'] = prodImage
		jsonData['description']  = str(parsedData[1]).replace('\n', '')
		jsonFile.write( json.dumps( jsonData, sort_keys=True, indent=2, separators=(',', ': ') ) )
		jsonFile.write(',\n')
		print jsonData
		print '\n'
		print '\n'

		jsonList.append(jsonData)

	print jsonList
	print '\n'
	print '\n'
	jsonFile.write(']')
	# jsonFile.write( json.dumps( jsonList, sort_keys=True, indent=2, separators=(',', ': ') ) )
	jsonFile.close()


if __name__ == '__main__':

	jsonList = []
	urls = ['http://www.partycity.com/category/halloween+costumes/mens+costumes+accessories/mens+superheroes+costumes.do', 'http://www.partycity.com/category/halloween+costumes/womens+costumes+accessories/womens+superheroes+costumes.do']

	for url in urls:
		seeder(url)
		# break
